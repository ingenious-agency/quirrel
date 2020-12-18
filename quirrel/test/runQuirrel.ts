import { QuirrelConfig, runQuirrel } from "../src";
import { createRedisFactory } from "../src/shared/create-redis";

export async function run(
  backend: "Redis" | "Mock",
  passphrases?: string[],
  incidentReceiver?: QuirrelConfig["incidentReceiver"]
) {
  const redisFactory = createRedisFactory(
    backend === "Redis" ? process.env.REDIS_URL : undefined
  );
  const { httpServer, close } = await runQuirrel({
    port: 0,
    redisFactory,
    passphrases,
    disableTelemetry: true,
    logger: "none",
    incidentReceiver,
  });

  const redis = redisFactory();

  return {
    teardown: close,
    server: httpServer,
    redis,
  };
}
export const HTTP_JOB_QUEUE = "http";

export interface HttpJob {
    endpoint: string;
    body: any;
    tokenId?: string;
}
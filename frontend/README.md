This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```
============

Run 
```bash
npm run build
```
Then upload files under out/ to AWS S3. 

Configure S3 with no public access. Configure Origin Access Control with only CloudFront access.

Configure CloudFront with certificates, error pages, alternate domain names (ie. www and no www), origins (for s3), behaviours (http to https) and functions (i.e. move permanently www) if necessary.

Register domain name in Route 53. Create hosted zone, create record names (only A, NS and CNAME, delete ipv6 AAAA if no need). Do not forget to set name servers in your dns provider (namecheap.com)

============

TODO: 
    - Configure form submit button for backend
    - CI/CD
    - CV Download feature
Note to future: be aware of invalidations in CloudFront while developing CI/CD
import { createRequire } from 'module';
import { createS3Stub } from './s3-stub.mjs';

// Smoke: the AWS SDK of an export (argv[2]) puts, lists, deletes and gets against the stub.
const require = createRequire(`${process.argv[2]}/package.json`);
const {
  S3, PutObjectCommand, ListObjectsCommand, DeleteObjectsCommand,
} = require('@aws-sdk/client-s3');
const stub = createS3Stub();
const port = await stub.listen();
const s3 = new S3({
  forcePathStyle: false, endpoint: `http://127.0.0.1:${port}`, region: 'us-east-1', credentials: { accessKeyId: 'k', secretAccessKey: 's' },
});
await s3.send(new PutObjectCommand({ Bucket: 'bucket', Key: 'previews/42/a.jpeg', Body: Buffer.from('x'), ContentType: 'image/jpeg', ACL: 'public-read' }));
const listed = await s3.send(new ListObjectsCommand({ Bucket: 'bucket', Prefix: 'previews/42/' }));
await s3.send(new DeleteObjectsCommand({ Bucket: 'bucket', Delete: { Objects: [{ Key: 'previews/42/a.jpeg' }] } }));
console.log(JSON.stringify({ listed: listed.Contents?.map((c) => c.Key), lastModifiedIsDate: listed.Contents?.[0]?.LastModified instanceof Date, left: [...stub.objects.keys()], kinds: stub.log.map((l) => l.kind) }));
await stub.close();

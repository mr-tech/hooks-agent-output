-- Synthetic rows for the analyst's own postgres:16 container (never hooks-postgres-local), after
-- `prisma db push --skip-generate --schema project-utils/prisma/schema.prisma`.
-- access_token NULL => guilds [] without a Discord call; refresh_token set + expires_at future => fetchUserAccount returns the account.
insert into "Users"(id,name,image,preferences) values (1,'analyst-probe',null,'{}'::jsonb);
insert into "Accounts"("userId",type,provider,"providerAccountId",refresh_token,access_token,expires_at) values (1,'oauth','discord','100000000000000001','probe-refresh',null,2000000000);
insert into "Sessions"("sessionToken","userId",expires) values ('analyst-probe-session-token',1,'2030-01-01');
-- added for the with-data and via-editor runs:
insert into "Messages"(id,fk_users_id,"createdAt","updatedAt",name,data,position) values (1,1,now(),now(),'probe message','{"content":"hi"}'::jsonb,0);

#.box: fill=#8f8 dashed
#font: Courier
[<actor> user]
[<database> ORACLE]
[<database> LDAP]
[<input> login-page]
[<sender> JAVA]
[ERPX]

[user] --> [login-page]
[login-page] -> [JAVA]
[JAVA] -> [LDAP]
[JAVA] <-- [LDAP]
[ORACLE] -> [JAVA]
[JAVA] -> [LDAP]
[JAVA] <- [LDAP]
[JAVA] -> [ORACLE]
[user] <:-- [ERPX]

[ sunny day|
0. user connects to login-page |
1. login-page queries JAVA|
2. JAVA Queries LDAP for Authentication |
3. LDAP Authenticates: OK |
4. JAVA Gets all *main* roles: JAVA <-- Oracle|
5. JAVA pushes All *main* roles: JAVA --> LDAP |
6. JAVA gets all *user* roles: JAVA <-- LDAP |
7. JAVA increments all *user* roles: JAVA --> Oracle|
8. User Connects to ERPX the old way
]

[ rainy day (LDAP has a role that Oracle dont)|
0. user connects to login-page |
1. login-page queries JAVA|
2. JAVA Queries LDAP for Authentication |
3. LDAP Authenticates: OK |
4. JAVA Gets all *main* roles: JAVA <-- Oracle|
5. JAVA pushes All *main* roles: JAVA --> LDAP |
6. JAVA gets all *user* roles: JAVA <-- LDAP |
7. JAVA increments all *user* roles: JAVA --> Oracle |
⚠️ Role from LDAP not found in Oracle SKIP it ⚠️ |
8. User Connects to ERPX the old way
]
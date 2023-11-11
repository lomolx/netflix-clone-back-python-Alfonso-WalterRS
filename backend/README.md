Comando para generar las llaves:

openssl genrsa -out private.pem 1024
openssl rsa -in private.pem -pubout > public.pub

Algoritmo de encriptamiento: RS512

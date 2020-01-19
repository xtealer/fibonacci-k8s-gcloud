# build images
docker build -t xtealer/fibonacci-k8s:client -t xtealer/fibonacci-k8s:client-$GIT_SHA -f ./client/Dockerfile ./client
docker build -t xtealer/fibonacci-k8s:server -t xtealer/fibonacci-k8s:server-$GIT_SHA -f ./server/Dockerfile ./server
docker build -t xtealer/fibonacci-k8s:worker -t xtealer/fibonacci-k8s:worker-$GIT_SHA -f ./worker/Dockerfile ./worker

# push client image
docker push xtealer/fibonacci-k8s:client
docker push xtealer/fibonacci-k8s:client-$GIT_SHA
# push server image
docker push xtealer/fibonacci-k8s:server
docker push xtealer/fibonacci-k8s:server-$GIT_SHA
# push worker image
docker push xtealer/fibonacci-k8s:worker
docker push xtealer/fibonacci-k8s:worker-$GIT_SHA

# apply configuration
kubectl apply -f k8s

# set new images for deployments
kubectl set image deployments/client-deployment client=xtealer/fibonacci-k8s:client-$GIT_SHA
kubectl set image deployments/server-deployment server=xtealer/fibonacci-k8s:server-$GIT_SHA
kubectl set image deployments/worker-deployment worker=xtealer/fibonacci-k8s:worker-$GIT_SHA
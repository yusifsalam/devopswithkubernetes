#!/bin/zsh
docker build -t salamy1/dwk-project .
docker push salamy1/dwk-project
kubectl rollout restart deployment project-dep
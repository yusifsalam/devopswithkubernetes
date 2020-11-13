#!/bin/zsh
docker build -t salamy1/dwk-project-front .
docker push salamy1/dwk-project-front
kubectl rollout restart deployment project-dep
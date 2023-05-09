if (!(Select-String -Pattern " devlab " -InputObject (docker ps)))
{
    echo "No container found. Starting devlab container...";
}
else 
{
    docker stop devlab;
    docker rm devlab;
}

docker build . -t devlab --build-arg NEXT_PUBLIC_API_URI=http://devlab-api

docker run -p 3000:3000 --name devlab --network webnet1 -d devlab 
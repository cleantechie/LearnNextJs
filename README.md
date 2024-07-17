# This is an assessment for FomoFactory

## Techstack : Next.js,Redux Toolkit, MongoDB

## Running the project

Recommended Approach:

## 1 Lets Dock It (Using Docker)

Install Docker (Guide Attached below)

Win : https://docs.docker.com/desktop/install/windows-install/#install-docker-desktop-on-windows

Mac : https://docs.docker.com/desktop/install/mac-install/#install-and-run-docker-desktop-on-mac

### 1. Start the docker engine

Either opening the existing app / new installed app

or

by runnnig the below command in your terminal/powershell

```
start docker
```

### 2. Download or clone the repository

Navigate to the directory under which the FomoFactoryAssessment is cloned or downloaded

By default the path would be as C:\Downloads\FomoFactoryAssessment

Run the below cmd

```
cd price-tracker
```
Once you are in the price-tracker


### 3.Run the below cmd  

```
docker compose up --build
```

## Almost there.......

Open the below in your preffered browser

http://localhost:3000

## VOILAAA!!!!

### P.S: Without a single library installed you have runned the project; All the heavy lifting is done by docker.
### If you have faced any issue at fetching stocks

head to the below

https://cors-anywhere.herokuapp.com/corsdemo

Request temprary demo access and it should be fetching stock prices..

## 2 Old School (Traditional install)

### Pre-requisties
```
Note : You should have Node.js and MongoDb installed
```

### 1. Download or clone the repository

Navigate to the directory under which the FomoFactoryAssessment is cloned or downloaded

By default the path would be as C:\Downloads\FomoFactoryAssessment

Run the below cmd

```
cd price-tracker
```
Once you are in the price-tracker

### 2. Run ``` npm install ```

After downloading the libraries required

### 3.Run the any of the below cmd  

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```



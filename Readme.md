
# Artist Search API


A simple Node JS REST API built using Express jS middleware which allows you to search artist details by the name of artist.
If the artist searched is not available in data it will show some random artist names from list of available artists. If the searched artist is available his/her details will be presented as a csv file whose name must be specified by the user.
  
---

## Features

- Search artist details by the name
- Get search results in CSV file.
- If no matching artist found get random artists.


## Tech Stack

**Server:** Node, Express


## Requirements
- Node.JS installed 

## Parameters


| Parameter | Required   | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `YES` | Name of artist to search |
| `filename` | `YES` | Name of output CSV file to store reesult in.|



## Run Locally

Clone the project

```bash
  git clone https://github.com/faysalmahmod/ArtistSearchAPi
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Usage

- You can start the app by executing npm run start.
- Now the endpoint should be available according to your port number. Default is at http://localhost:8000.


## EndPoints
This server exposes the following REST API's:



![REST APi](https://iili.io/mNS3a2.md.png)



- **GET `/ `**

  ![REST APi](https://iili.io/mNUgqJ.md.png)

- **GET  `/artists/{name}/output_file/{filename}`**

  ![REST APi](https://iili.io/mNUr0v.png)

---

## Example URL

```http://localhost:8080/artists/John%20Williams/output_file/output```

## Tests
![Test result](https://iili.io/mNbH21.png)




## Known Issue
Currently there's no known issue. If you find any, contact.
## Authors

- [Faisal Mahmood](https://github.com/faysalmahmod)

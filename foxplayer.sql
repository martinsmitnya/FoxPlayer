playLists_table { "id": 1, "title": "Favorites", "system": 1 }
CREATE TABLE playLists_table (
    listId int AUTO_INCREMENT,
    title varchar(255),
    systems int DEFAULT 0,
    PRIMARY KEY (trackId)
);

tracks_table { "id": 1, "title": "Purple_drift", "artist": "Organoid", "duration": 545, "path": "C:\Users\User\greenfox\FoxPlayer\public\audio\Organoid_-_09_-_Purple_Drift.mp3" }
CREATE TABLE tracks_table (
    trackId int AUTO_INCREMENT,
    title varchar(255),
    artist varchar(255),
    duration int, 
    path varchar(255),
    playlist int,
    PRIMARY KEY (trackId)
);
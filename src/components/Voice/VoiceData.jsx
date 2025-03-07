import audioFile from "./greeting/answering-machine-female-hi-its-me-83956.mp3"


export const callgreetingscolumns = [
    {
      name: "Callgreetings Name",
      selector: "callgreetings",
      sortable: true,
     
    },
    {
      name: "Callgreetingsaudio",
      selector: "audioFile",
      sortable: true,
    },
    {
      name: "USER",
      selector: "user",
      sortable: true,
    },
  ];
  
  export const callgreetingsdata = [
    {
      callgreetings: "Greetings 1",
      audioFile: "audioFile",
      user:"092138092213"
    },
    {
      callgreetings: "Greetings 2",
      audioFile: "path/to/audio/file2.mp3",
      user:"8090-879808"
    },
    {
      callgreetings: "Greetings 3",
      audioFile: "path/to/audio/file3.mp3",
      user:"8090-879808"
    },
    {
      callgreetings: "Greetings 4",
      audioFile: "path/to/audio/file4.mp3",
      user:"98890892313"
    },
    {
      callgreetings: "Greetings 5",
      audioFile: "path/to/audio/file5.mp3",
      user:"8090-879808"
    }
  ];
interface Config {
  api: {
    baseurl: string;
  };
}

const config: Config = {
  api: {
    baseurl: "http://localhost:3001/api",
  },
};

export default config;

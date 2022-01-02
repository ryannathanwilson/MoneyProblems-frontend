interface Config {
  api: {
    baseurl: string;
  };
}

const config: Config = {
  api: {
    // baseurl: "http://localhost:3001/api",
    baseurl: "https://mo-money-mo-problems.herokuapp.com/api",
  },
};

export default config;

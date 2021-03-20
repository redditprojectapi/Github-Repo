// here we are using console.log for log error messages in dev environment..
const Log = (tagname: string, message: string) => {
  if (__DEV__) {
    console.log(tagname, message);
  }
};

export default Log;

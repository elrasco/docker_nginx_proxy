module.exports.noneFromAmazon = response => {
  const amzHeaders = Object.keys(response.headers).filter(header => header.indexOf('x-amz') > -1);
  if (amzHeaders.length > 0) {
    throw new Error(`Expected no amazon headers in the response. Got [${amzHeaders}]`);
  }
};

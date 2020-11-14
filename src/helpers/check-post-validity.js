module.exports = function checkPostValidity(data, requiredData){
  for (const item of requiredData){
    if(!(item in data))
      return false
  }
  return true
}

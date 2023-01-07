const reducer = (dataWeather, action) => {
    return {
        ...dataWeather,
        data: action.payload,
    };
  };
  
  export default reducer;
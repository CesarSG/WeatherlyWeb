const reducer = (dataWeather, action) => {
    return {
        ...dataWeather,
        isLoading: action.status,
        current: action.payload,
    };
  };
  
  export default reducer;
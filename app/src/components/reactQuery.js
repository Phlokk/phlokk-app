// const fetchCreatorsProfileInfo = async () => {
  //   let user = await SecureStore.getItemAsync("user");
  //   user = JSON.parse(user);
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  //   axios
  //     .get("https://dev.phlokk.com/api/creators/working/results", {

  //         responseType: "json",
  //       })

  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  // const { data, status } = useQuery("users", fetchCreatorsProfileInfo);

  // if (status === "loading") {
  //   return (
  //     <View>
  //       <Text style={styles.users}>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (status === "error") {
  //   return (
  //     <View>
  //       <Text style={styles.error}>ERROR</Text>
  //     </View>
  //   );
  // }
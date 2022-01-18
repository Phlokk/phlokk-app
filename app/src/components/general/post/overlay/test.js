<View style={styles.container}>

<View style={styles.uiContainer}>
  <View style={styles.rightContainer}>

    <TouchableOpacity 
      onPress={() => handleUpdateLike(currentLikeState)}
    >
      <MaterialCommunityIcons
        color="white"
        size={40}
        name={currentLikeState.state ? "star" : "star-outline"}
      />

      <Text style={styles.actionButtonText}>
        {currentLikeState.counter}
      </Text>
    </TouchableOpacity>


    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => dispatch(openCommentModal(true, post))}
    >
      <Ionicons name="md-chatbubble-ellipses-outline" size={35} color="white" />
      <Text style={styles.actionButtonText}>
        {post.commentsCount}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.iconContainer}>
       <MaterialCommunityIcons name="share-all-outline" size={30} color="white" />
       <Text style={styles.actionButtonText}>
         Share
       </Text>
       </TouchableOpacity>

      <Text>
       <MaterialCommunityIcons name="music-circle-outline" size={34} color='white' />
       </Text>
    </View>



  <View style={styles.bottomContainer}>

    <View>
    <Text
      onPress={() => navigation.navigate('profileOther', { initialUserId: user?.uid })}>
    <Image style={styles.profilePicture} source={{ uri: user?.photoURL }} />
    </Text>
      
    <Text style={styles.handle}>@{user?.username}</Text>
    <Text style={styles.description}>{post.description}</Text>

    
        </View>
     </View>
   </View>
</View>
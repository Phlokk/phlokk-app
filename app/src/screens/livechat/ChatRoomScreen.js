import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import uuid from "uuid-random";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LiveChatRoomNav from "../../components/general/liveChatNav/LiveChatRoomNav";
import ChatListItem from "./ChatListItem";
// import { MaterialIcons } from "@expo/vector-icons";
import axios from "../../redux/apis/axiosDeclaration";
import { Octicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import * as ImagePicker from "expo-image-picker";
import { fetchGetUser } from "../../redux/sagas/requests/fetchUser";
import * as SecureStore from "expo-secure-store";
import { apiUrlsNode } from "../../globals";
import ChatModal from "./ChatModal";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import RisingStar from "../../components/common/RisingStar";
import { useTheme } from "../../theme/context";
import io from "socket.io-client";
import Alert from "./Alert";
import { useToast } from "react-native-toast-notifications";


const ChatRoomScreen = ({ route }) => {
  const socket = io.connect(apiUrlsNode.BASE_URL2, {}, { autoConnect: false });
  const navigation = useNavigation();
  const toast = useToast();
  const { theme } = useTheme();
  const party = route.params?.party;
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [profileImage, setProfileImage] = useState(null);
  const [partyMembers, setPartyMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [visitedMembers, setVisitedMembers] =useState(0)
  const [member, setMember] = useState(null);
  const [viewMember, setViewMember] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState(null);
  const [hasHostLeft, setHasHostLeft] = useState(false);
  const [userJoined, setUserJoined ] =useState(null)

  useEffect(() => {
    socket.emit("JOIN_ROOM", { user: currentUser, roomId: party._id });
    socket.on("ROOM_JOINED", (data) => handleUserJoin(data));
    socket.on("HOST_LEFT", () => handleNavigateBack() );
    socket.on("USER_LEFT", ({userId}) =>  UserLeft(userId));
    socket.on("MESSAGE_RECIEVED", (data) => handleUpdateComments(data))
  }, []);

  useEffect(() => {
    getPartyInvitedMembers();
    getPartyVisitedMembers()
    getPartyMembers();
    getChatsInParty();

    return () => {
      // socket.emit("LEAVE_ROOM", { userId: currentUser._id, roomId: party._id });
      socket.disconnect();
      // if (
      //   (currentUser._id || currentUser.id) ===
      //   (party.user.id || party.user._id)
      // )
      //   deleteParty();
    };
  }, []);
  const handleUserJoin = ({user}) =>{
    let idx = partyMembers.map((e)=> e?.user?._id)
     if(user?._id !== (party?.user?._id || party?.user?.id ) && 
     !idx.includes(user?._id) &&
      user._id !== currentUser._id){
      setVisitedMembers(e=> e+1 )
      setPartyMembers(e=> [...e, {user}]);
      toast.show(`${user?.username} joined the party`, {
        type: "success",
      });
     }   
  }
  const handleNavigateBack = () => {
    if (currentUser?._id !== (party.user?._id || party.user.id)) {
      setHasHostLeft(true);
    }
  };
  const UserLeft = (userId) =>{
    setPartyMembers([...partyMembers.filter((e)=> e.user?.id !== userId)])
  }
  const handleUpdateProfileImage = async () => {
    let user = await SecureStore.getItemAsync("user");
    user = JSON.parse(user);
    let partyUserId = party.user?._id || party.user.id;
    if (partyUserId !== user._id) return;

    await chooseImage(user);
  };
  const chooseImage = async (user) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
      let split = result.uri.split("/");
      let fileName = split[split.length - 1];

      const formData = new FormData();
      formData.append("photo_url", {
        name: fileName,
        uri: result.uri,
        type: "image/*",
      });

      let url = apiUrlsNode.BASE_URL2 + `/api/users/uploadImage/${user._id}`;
      const config = {
        "content-type": "multipart/form-data",
        "auth-token": `${user.token}`,
      };

      fetch(url, {
        method: "POST",
        headers: config,
        body: formData,
      })
        .then(async (e) => {
          const response = await fetchGetUser();
          setCurrentUser(response);
          alert("Profile picture updated successfully.");
        })
        .catch((ex) => {
          alert("Unable to update profile picture. Please try again later.");
        });
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const getPartyInvitedMembers = async () => {
    const response = await axios.get(
      `/api/room/member/${party?._id}?joined=0&invited=1`
    );
    setInvitedMembers(response.data);
  };
  const getPartyMembers = async () => {
    const response = await axios.get(`/api/room/member/${party?._id}?joined=1`);
    setPartyMembers(response.data.filter((e) => e.user.id !== party.user.id));
  
  };
  const getPartyVisitedMembers = async () => {
    const response = await axios.get(`/api/room/member/visited/${party?._id}`);
    setVisitedMembers(response.data?.length);
    
  };
  const getChatsInParty = async () => {
    const response = await axios.get(`/api/room/chat/${party._id || party.id}`);
    setComments(response.data.map(comment => ({
      ...comment,
      comment_replies: comment.comment_replies ? comment.comment_replies?.filter(reply => reply._id !== null) : null
    })));
  };
  const deleteParty = async () =>
    await axios.post(`/api/rooms/delete/${party?._id}`);

  const handleAddComment = async () => {
    if (!reply) {
      socket.emit("SEND_MESSAGE", {
        userId: currentUser._id || currentUser.id,
        roomId: party._id || party.id,
        message: comment,
        _id: uuid().toString(),
      })
    } else if (reply?.replyToCommentId) {
      socket.emit("SEND_MESSAGE", {
        userId: currentUser._id || currentUser.id,
        roomId: party._id || party.id,
        message: comment,
        _id: uuid().toString(),
        commentId: reply?.commentId,
        repliedToCommentId: reply?.replyToCommentId,
      })
    } else {
      socket.emit("SEND_MESSAGE", {
        userId: currentUser._id || currentUser.id,
        roomId: party._id || party.id,
        message: comment,
        _id: uuid().toString(),
        commentId: reply?.commentId,
        data: comments
      })
    }
    setComment("");
    setReply(null);
  };
  const handleUpdateComments = async (data) => {
    // reply to reply is not working use backend to get updated array
    if(data.repliedToCommentId){
      const c = comments.find(e=> e._id === data.commentId)
      const cr = c.comment_replies?.find((e)=> e._id ===  data.repliedToCommentId)
      if(cr?.comment_replies){
        cr.comment_replies.push(data)
      }else{
        cr.comment_replies = [data]
      } 
      setComments([ ...comments ])
    }else if(data.commentId){
      setComments([ ...data.updatedData.data ])
    } else{
      setComments(e=> [ data, ...e ])
    }

  }

  return (
    <View style={viewMember ? styles.blurred_container : styles.container}>
      <View style={styles.navView}>
        <LiveChatRoomNav
          joinedMembers={partyMembers}
          partyMembers={invitedMembers}
          setPartyMembers={setInvitedMembers}
          party={party}
          title="Mad Chatter"
          deleteParty={deleteParty}
        />
      </View>
      <View>
        <View style={styles.topicView}>
          <View style={styles.statsView}>
            <Text style={styles.topicText}>
              <Feather name="user" size={15} color={colors.green} /> {visitedMembers}
            </Text>
            <Text style={styles.topicText}> LIVE: {partyMembers?.length}</Text>
          </View>
        </View>
        <View style={styles.chatIconRow}>
          <View style={styles.text}>
            <View style={styles.micRow}>
              <TouchableOpacity
                onLongPress={handleUpdateProfileImage}
                onPress={() => {
                  setMember(party.user);
                  setViewMember(true);
                }}
              >
                <Image
                  source={{
                    uri: party.user
                      ? party.user.photo_url
                      : require("../../../assets/userImage.png"),
                  }}
                  style={styles.avatarRow}
                />
              </TouchableOpacity>
              <View style={styles.usernameView}>
                {party?.user?.username !== null ? (
                  <Text
                    selectable={true}
                    style={
                      theme == "light"
                        ? styles.username_light
                        : styles.username_dark
                    }
                  >
                    {party?.user?.username}
                    <View>
                      {party?.user && party?.user?.is_verified == 1 && (
                        <VerifiedIcon />
                      )}
                    </View>
                  </Text>
                ) : (
                  <Text
                    style={
                      theme == "light"
                        ? styles.username_light
                        : styles.username_dark
                    }
                  >
                    @user
                  </Text>
                )}
                <View style={styles.risingStarView}>
                  {party?.user?.is_rising === 1 && <RisingStar />}
                </View>
              </View>
              <View style={styles.partyTitleView}>
                <Text style={styles.partyTitle} numberOfLines={2}>
                  {party?.title}
                </Text>
              </View>

              <View style={styles.optionView}>
                <TouchableOpacity
                  style={styles.iconView}
                  onPress={() => setViewChat(true)}
                >
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
                {currentUser._id !== party.user.id && (
                  <>
                    <TouchableOpacity style={styles.iconView}>
                      <MaterialCommunityIcons
                        name="bookmark"
                        size={21}
                        color={colors.secondary}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconView}>
                      {/* <Feather
                    name="user-plus"
                    size={21}
                    color={colors.secondary}
                  /> */}
                      <AntDesign name="swap" size={22} color={colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconView}>
                      <MaterialCommunityIcons
                        name="fire"
                        size={23}
                        color={colors.secondary}
                      />
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity style={styles.iconView}>
                  <FontAwesome
                    name="opencart"
                    size={20}
                    color={colors.white}
                    onPress={
                      party?.user && party?.user?.link
                        ? () => Linking.openURL(party?.user?.link)
                        : null
                    }
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.iconView}>
                  <Feather name="flag" size={20} color={colors.secondary} />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
        {/* below here will be rows of users in the live */}

        <ChatListItem
          party={party}
          partyMembers={partyMembers}
          setPartyMembers={setPartyMembers}
          viewMember={viewMember}
          setViewMember={setViewMember}
          member={member}
          setMember={setMember}
        />
      </View>
      <ChatModal
        party={party}
        open={viewChat}
        onClose={() => setViewChat(false)}
        currentUser={currentUser}
        comments={comments}
        commentCount={comments.length}
        comment={comment}
        setComment={setComment}
        addComment={handleAddComment}
        setReply={setReply}
      />
      <Alert
        open={hasHostLeft}
        onClose={() => {
          setHasHostLeft(false);
          navigation.goBack();
        }}
        text={`Host has left the party`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  blurred_container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  microphoneView: {
    flexDirection: "row",
  },
  optionView: {
    marginTop: 20,
    flexDirection: "row",
  },
  iconView: {
    marginHorizontal: 15,
  },
  navView: {
    marginTop: 35,
  },
  text: {
    color: colors.secondary,
    marginHorizontal: 25,
    marginTop: 5,
  },
  liveText: {
    color: colors.secondary,
    marginHorizontal: -8,
  },
  chatIconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatText: {
    textAlign: "center",
    color: colors.secondary,
    marginTop: 15,
  },
  micRow: {
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: colors.primary,
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.green,
  },
  infoRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicText: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.secondary,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  topicView: {
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBoxView: {
    flexDirection: "row",
    padding: 10,
    marginTop: 5,
    paddingHorizontal: 5,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: colors.green,
    width: 300,
  },
  statsView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
    width: 200,
  },
  countText: {
    color: colors.green,
  },
  partyTitle: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: "center",
  },
  partyTitleView: {
    marginTop: 20,
  },
  usernameText: {
    fontSize: 12,
    color: colors.white,
    marginTop: 25,
    marginBottom: 40,
    color: colors.white,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  username_light: {
    fontSize: 12,
    color: colors.white,
    marginBottom: 5,
  },
  username_dark: {
    fontSize: 12,
    color: colors.white,
    marginBottom: 5,
  },
  risingStarView: {
    right: 16,
    top: 6,
  },
});

export default ChatRoomScreen;

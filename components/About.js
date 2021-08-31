import React from "react";
import {View, StyleSheet, Text, Linking, ImageBackground} from "react-native";
import {FontAwesome} from '@expo/vector-icons';

export default function About() {
    return (
        <>
            <ImageBackground
                style={styles.image}
                source={{uri: 'https://i.pinimg.com/564x/85/8c/b2/858cb28491791fb661d4563c77d62428.jpg'}}/>
            <View style={styles.container}>
                <View style={styles.author}>
                    <FontAwesome name={"code"} size={22}/>
                    <Text style={{fontSize: 18}}> with </Text>
                    <FontAwesome name={"heart"} size={22}/>
                    <Text style={{fontSize: 18}}> by</Text>
                    <Text onPress={() => Linking.openURL('https://erfanansari.ir')}
                          style={{...styles.link,fontSize:18}}>
                        {" "}erfanansari.ir
                    </Text>
                </View>
                <View style={{marginBottom: 25}}>
                    <Text style={styles.text}>
                        This is an open source project, you can find the source code
                        <Text
                            onPress={() => Linking.openURL('https://github.com/erfanansari/weather')}
                            style={styles.link}>
                            {" "}
                            here
                            {" "}
                            <FontAwesome name="github" size={24} color="black"/>
                        </Text>
                    </Text>
                    <Text style={styles.text}>
                        Also here is the
                        <Text
                            onPress={() => Linking.openURL('https://react-redux-weather-app-erfanthegray.vercel.app/')}
                            style={styles.link}>
                            {" "}
                            the Web version
                            {" "}
                        </Text>
                        <Text>
                            <Text>
                                and it's
                            </Text>
                            <Text
                                onPress={() => Linking.openURL('https://github.com/erfanansari/react-redux-weather-app')}
                                style={styles.link}>
                                {" "}
                                source code
                                {" "}
                                <FontAwesome name="github" size={24} color="black"/>
                            </Text>
                        </Text>
                    </Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    author: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16
    },
    link: {
        color: '#2f6bd5',
    },
    text: {
        fontSize: 16,
        padding: 20
    },
    image: {
        flex: 1,
    }
})
import React, {useEffect, useReducer} from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from "react-native";
import moment from "moment";


const params = {
    key: 'ad72626cde58d6cc809215002ca974cd',
    baseURI: 'https://api.openweathermap.org/data/2.5/'
}

const conditions = ['Clear', 'Dust', 'Ash', 'Squall', 'Smoke', 'Tornado', 'Sand'];

const initialState = {
    searchTerm: '',
    data: null,
    error: null,
    loading: null,
    submit: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH':
            return {
                error: null,
                submit: false,
                loading: false,
                searchTerm: '',
                data: action.payload
            }
        case 'ERROR':
            return {
                data: null,
                submit: false,
                loading: false,
                searchTerm: '',
                error: action.payload
            }
        case 'LOADING':
            return {...state, loading: true}
        case 'SEARCHTERM':
            return {...state, searchTerm: action.payload}
        case 'SUBMIT':
            return {...state, submit: true}
        default:
            return state
    }
}

export default function WeatherUI({navigation}) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const {searchTerm, data, error, loading, submit} = state


    const getDate = () => moment().format('dddd') + ', ' + moment().format('LL')


    useEffect(() => {
        if (!submit) return;

        (async function fetchData() {
            dispatch({type: 'LOADING'})
            const response = await fetch(`${params.baseURI}weather?q=${searchTerm}&units=metric&APPID=${params.key}`)
            const result = await response.json()
            if (result.cod !== 200 && result.cod !== undefined) {
                dispatch({type: 'ERROR', payload: result})
            } else {
                dispatch({type: 'FETCH', payload: result})
            }
        })()
    }, [searchTerm, submit])

    const weatherCondition = data?.weather ? data.weather[0].main : null;

    return (
        <>
            {weatherCondition && conditions.includes(weatherCondition) ?
                <ImageBackground
                    source={require('../assets/images/cloudy.png')}
                    resizeMode="cover"
                    style={styles.image}
                />
                :
                <ImageBackground
                    source={require('../assets/images/sunny.png')}
                    resizeMode="cover"
                    style={styles.image}
                />
            }

            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    value={searchTerm}
                    onChangeText={payload => dispatch({
                        type: 'SEARCHTERM',
                        payload
                    })}
                    onEndEditing={() => dispatch({type: 'SUBMIT'})}
                    placeholderTextColor="white"
                    scrollEnabled={false}
                    placeholder={data?.name ? '' : "enter your city name"}
                />
                <Text style={styles.city}>{data?.name || 'city'}</Text>
                <Text style={styles.date}>{getDate()}</Text>
                <Text
                    style={styles.temp}>{data?.main ? `${Math.round(data.main.temp)}` : 'Temp'}°</Text>
                <Text
                    style={{color: 'white', fontSize: 27, marginTop: -8}}>--------------</Text>

                <View style={styles.descriptionContainer}>
                    <View style={styles.info}>
                        <Text
                            style={styles.weather}>{data?.weather ? `${data.weather[0].main}` : 'weather'}</Text>
                        <Text
                            style={styles.description}>{data?.weather ? `${data.weather[0].description}` : 'description'}</Text>
                    </View>
                    {data?.weather[0] &&
                    <Image
                        style={{height: 99, width: 100}}
                        source={{uri: `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}}
                    />}
                </View>
                <Text
                    style={styles.extremum}>{data?.main ? `${Math.floor(data.main.temp_min)}°c / ${Math.round(data.main.temp_max)}°c` : 'min / max'}</Text>
                {error &&
                <Text style={styles.error}>{`${error.message} please try again`}</Text>}
                {loading &&
                <ActivityIndicator style={styles.spinner} color={"white"} size={"large"}/>}
                <TouchableOpacity
                    onPress={() => navigation.navigate('About')}><Text
                    style={styles.about}>About</Text></TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 115
    },
    image: {
        flex: 1,
        position: 'absolute',
        ...StyleSheet.absoluteFill
    },
    searchBar: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '60%',
        paddingVertical: 8
    },
    city: {
        marginTop: 26,
        fontSize: 28,
        color: 'white'
    },
    date: {
        marginTop: 16,
        fontWeight: 'bold',
        color: '#f6f6f6'

    },
    temp: {
        marginTop: 26,
        fontSize: 65,
        fontWeight: 'bold',
        color: 'white'
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        fontSize: 16,
        color: 'white'
    },
    weather: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    info: {
        alignItems: 'center'
    },
    extremum: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    error: {
        marginTop: 12,
        fontSize: 18,
        color: 'red'
    },
    spinner: {
        padding: 16,
    },
    about: {
        color: 'white',
        fontSize: 16,
        marginLeft: 'auto',
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        marginTop: 25,
        padding: 16,
    }
});
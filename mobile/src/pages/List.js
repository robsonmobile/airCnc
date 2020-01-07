import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client'
import { Alert, SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet, Text } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List() {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage
            .getItem('user')
            .then(user_id => {
                const socket = socketio('http://192.168.0.102:3333', {
                    query: { user_id }
                })

                socket.on('booking-response', booking =>
                    Alert.alert(`Your booking request at ${booking.spot.company} for ${booking.date} was ${booking.approved ? 'APPROVED' : 'REJECTED'}`)
                )
            })
    }, [])


    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim())

            setTechs(techsArray)
        })
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30

    }
})

 import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function Emails({ navigation }) {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        fetch('https://mobile.ect.ufrn.br:3002/emails')
            .then(response => response.json())
            .then(receivedEmails => setEmails(receivedEmails));
    }

    function renderEmail({ item }) {
        return <TouchableOpacity onPress={() => navigation.navigate('Email', { id: item.id })}>
            <View style={styles.email}>
                <Image style={styles.picture} source={{ uri: item.picture }}></Image>

                <View style={styles.emailContent}>
                    <View style={styles.emailInfo}>
                        <Text style={styles.emailTo}>{item.to}</Text>
                        <Text style={styles.emailTime}>{item.time}</Text>
                    </View>
                    <View style={styles.emailInfo}>
                        <Text style={styles.emailTittle}>{item.tittle}</Text>
                        <Icon style={styles.emailFavorite} name={item.star ? 'star' : 'staro'} size={15} color={item.star ? "#EEAD2D" : "black"} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CAIXA DE MENSAGENS</Text>
                <Text style={styles.headerEmailQuantity}>Você tem ({emails.length}) email(s) disponíveis!</Text>
            </View>
            <FlatList
                data={emails}
                renderItem={renderEmail}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fff',
    },

    header: {
        marginVertical: 20,
        padding: 20,
        alignSelf: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 24,

        color: 'black',

        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    headerEmailQuantity: {
        fontSize: 14,

        color: '#333',
    },


    email: {
        flexDirection: 'row',
        justifyContent: 'center',

        height: 90,
    },

    picture: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,

        marginLeft: 20,
        marginRight: 8,
    },

    emailContent: {
        flex: 1,
        alignItems: 'center',
    },

    emailInfo: {
        flexDirection: 'row',

        justifyContent: 'space-between',
    },
    emailTo: {
        flex: 1,

        fontWeight: 'bold',
        fontSize: 18,
    },
    emailTime: {
        flex: 1,

        position: 'absolute',
        right: 20,

        color: '#0041C2',
        fontSize: 14,
    },
    emailTittle: {
        flex: 1,
        fontSize: 14,
    },
    emailFavorite: {
        flex: 1,

        position: 'absolute',
        right: 20,
    }
})
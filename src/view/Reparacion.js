import React, { Component } from 'react'
import * as RN from 'react-native'
import { useState, useEffect } from 'react'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { async } from '@firebase/util'
import Select2 from 'react-native-select-two'
import {usePostData} from '../../hooks/useCrud'
import { nombres } from '../../public/nombres'
import { estados } from '../../public/estados'
// import { Text, View, Button } from 'react-native'

function Reparacion ({navigation}) {
    
    const {mutate, isLoading: isAdding} = usePostData()

    if (isAdding) {
        return <Spinner text={'Agregando'} color={'blue'} textColor={'blue'} />;
      }
    
    const [newitem, setNewitem] = useState({
        id: '',
        numeroTicket: '',
        nombre: '',
        localidad: '',
        estado: '',
        observacion: '',
        tiempo: new Date(),
    })

    const agregar = newitem => {
        const libroData = {
          action: 'add',
          collection: 'books',
          data: newitem,
        };
        mutate(libroData);
      };

    // envio de datos a firebase
    // const fectData = async () =>{
    //     await addDoc(collection(database, 'reparacion'), newitem)
    //     navigation.navigate('Home')
    // }
  
    return (
      <RN.View style={{ flex: 1, alignItems: 'center' }}>
        <RN.Text style={{ fontSize: 32, fontWeight: '700' }}> Seguimiento TT </RN.Text>
        {/* <hr /> */}
        <Select2
            isSelectSingle
            style={{ width: '90%',
            padding: 13,
            marginVertical: 6,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 6 }}
            colorTheme="blue"
            popupTitle="Nombres"
            title="Nombre Completo"
            cancelButtonText='cancelar'
            selectButtonText='seleccionar'
            searchPlaceHolderText='Buscar'
            data={nombres}
            onSelect={data => {
                setNewitem({...newitem, nombre:data })
                // setEstNombre({ data })
                console.log(data)
            }}
            onRemoveItem={data => {
                setNewitem({...newitem, nombre:data })
                // setEstNombre({ data })
                console.log(data)
            }}
        />

        <RN.TextInput 
            onChangeText={(text) => setNewitem({...newitem, id:text })}
            placeholder='Cedula'
            style={{ width: '90%',
            padding: 13,
            marginVertical: 6,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 6 }}
        />     

        <RN.TextInput 
            onChangeText={(text) => setNewitem({...newitem, numeroTicket:text })}
            placeholder='Numero de Ticket'
            style={{ width: '90%',
            padding: 13,
            marginVertical: 6,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 6 }}
        />

        <RN.TextInput 
            onChangeText={(text) => setNewitem({...newitem, localidad:text })}
            placeholder='Localidad'
            style={{ width: '90%',
            padding: 13,
            marginVertical: 6,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 6 }}
        />

        <Select2 
            isSelectSingle
            style={{ width: '90%',
            padding: 13,
            marginVertical: 6,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 6 }}
            colorTheme="blue"
            popupTitle="Estado"
            title="Estado"
            cancelButtonText='cancelar'
            selectButtonText='seleccionar'
            searchPlaceHolderText='Buscar'
            data={estados}
            onSelect={data => {
                setNewitem({...newitem, estado:data })
                // setEEstados({ data })
                console.log(data)
            }}
            onRemoveItem={data => {
                setNewitem({...newitem, estado:data })
                // setEEstados({ data })
                console.log(data)
            }}
        />
        <RN.TextInput 
            onChangeText={(text) => setNewitem({...newitem, observacion:text })}
            placeholder='Observacion breve de la Solucion'
            style={{ width: '90%',
            padding: 13,
            marginVertical: 6,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 6 }}
        />

        <RN.Button
            title='Guardar' 
            onPress={newitem => agregar(newitem)}

        />
       
      </RN.View>
    )

  }


export default Reparacion

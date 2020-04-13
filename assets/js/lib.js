//Author: Tanuj Jain
//Date Created: Apr-12-2020

// The main objective of this file is to define common methods for this program.

"use strict"

/* uuidGenerator => Function to generate Unique Id*/
function uuidGenerator (){
    var len = 20;
    parseInt((Math.random() * 20 + 1) * Math.pow(10,len-1), 10);   
    var uniquenumber = Date.now().toString(36) + ((Math.random() * 34 + 1) * Math.pow(10,len-1)).toString(36).substr(2,34).toUpperCase();
    return uniquenumber;
  };

/* storeObjectToLocalStorage => Function to store object in Local storage in string format */
function storeObjectToLocalStorage (key, value){
    let value_serialize =  JSON.stringify(value);
    console.log(value_serialize);
    window.localStorage.setItem (key, value_serialize);
}


/* readLocalStorageKeyConvertToObject => Function to read local storage key value pair in string format, convert into Object and return the object*/
function readLocalStorageKeyConvertToObject (key){
    let value_deserialize =  JSON.parse(window.localStorage.getItem(key));
    console.log(value_deserialize);
    return value_deserialize;
}


/* Function to read local storage key value pair in string format, convert into Object and return the object*/
function removeItemFromLocalStorage (key){
    window.localStorage.removeItem(key);
}
"use client";


const useStorage = () => {

    const setItem = (key, value, storage = 'local') => {

        if (typeof window !== 'undefined') {

            storage === 'local' ? window.localStorage.setItem(key, value) : window.sessionStorage.getItem(key, value);

        }

    }

    const setItems = (data = null, storage = 'local') => {

        if (typeof window !== 'undefined' || data !== null) {

            const keys = Object.keys(data);

            keys.forEach((x) => {

                storage === 'local' ? window.localStorage.setItem(x, data[x]) : window.sessionStorage.setItem(x, data[x]);

            })

        }

    }

    const removeItem = (key, storage = 'local') => {


        if (typeof window !== 'undefined') { 

            storage === 'local' ? window.localStorage.removeItem(key) : window.sessionStorage.removeItem(key);

        }


    }

    const removeItems = (data = [], storage = 'local') => {


        if (typeof window !== 'undefined') { 

            storage === 'local' ? window.localStorage.removeItem(key) : window.sessionStorage.removeItem(key);

            if (typeof window !== undefined || typeof window !== null || data.length !== 0) {

                const keys = Object.keys(data);
    
                keys.forEach((x) => {
    
                    storage === 'local' ? window.localStorage.removeItem(x) : window.sessionStorage.removeItem(x);
    
                })
        
            }
    
        }


    }

    const clearStorage = (storage = 'local') => {

        if (typeof window !== 'undefined') { 

            storage === 'local' ? window.localStorage.clear() : window.sessionStorage.clear();

        }

    }

    const getItem = (key, storage = 'local') => {

        if (typeof window !== 'undefined') {

            const value = storage === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);

            return value;

        }

        return null;

    }

    const getItems = (data = [], storage = 'local') => {


        if (typeof window !== 'undefined' || data.length !== 0) {

            const keys = Object.keys(data);
            const values = [];

            keys.forEach((x) => {

                const value = storage === 'local' ? window.localStorage.getItem(x) : window.sessionStorage.getItem(x);
                values.push(value);

            })


            return values;

        }

        return [];


    }

    return { setItem, setItems, removeItem, clearStorage, getItem, getItems, removeItems };

}

export default useStorage
import dataStore from "@/store/dateBase";

const key = 'ims-token';

export const getToken = () => {
    return dataStore.getValue(key);
}

export const saveToken = (token: string) => {
    dataStore.save(key, token);
}

export const removeToken = () => {
    dataStore.delete(key)
}

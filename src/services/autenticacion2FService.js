import axiosInstance from './axiosInstance';

export const activarAutenticacion2F = async (email, password) => {
 return await axiosInstance.post('/Autenticacion2F/enable', {
    email: email,
    password: password
 }) 

};

export const validarAutenticacion2F = async (email, totpCode) => {
    return await axiosInstance.post('/Autenticacion2F/validate', {
        email: email,
        totpCode: totpCode
  })

};

export const desactivarAutenticacion2F = async (email, password) => {
  return await axiosInstance.post('/Autenticacion2F/disable', {
    email: email,
    password: password
  })

};

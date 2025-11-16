import { decryptData, encryptData } from "@/helpers/cryptojs";
import { useCredentialsStore } from "@/store";
import { useEffect, useState } from "react";

export default function useCredentials() {
  const { credentials, setCredentials } = useCredentialsStore();
  const [decryptedData, setDecryptedData] = useState<Credential[]>([]);

  useEffect(() => {
    const decrypted = credentials.map((credential) => {
      return {
        ...credential,
        fields: credential.fields.map((field) => {
          return {
            ...field,
            value: decryptData(field.value),
          };
        }),
      };
    });
    setDecryptedData(decrypted);
  }, [credentials]);

  const addCredential = (data: Omit<Credential, "id">) => {
    const newCredential: Credential = {
      ...data,
      id: Date.now().toString(),
    };

    const encryptedData: Credential = {
      ...newCredential,
      fields: newCredential.fields.map((field) => {
        return { ...field, value: encryptData(field.value) };
      }),
    };
    setCredentials([encryptedData, ...credentials]);
    return newCredential.id;
  };

  const updateCredential = (id: string, data: Omit<Credential, "id">) => {
    const encryptedData: Credential = {
      ...data,
      id,
      fields: data.fields.map((field) => {
        return { ...field, value: encryptData(field.value) };
      }),
    };
    const updated = credentials.map((cred) =>
      cred.id === id ? encryptedData : cred
    );
    setCredentials(updated);
  };

  const deleteCredential = (id: string) => {
    const filtered = credentials.filter((cred) => cred.id !== id);
    setCredentials(filtered);
  };

  const getCredentialById = (id: string): Credential | undefined => {
    const credential = credentials.find((cred) => cred.id === id);
    if (!credential) return undefined;

    return {
      ...credential,
      fields: credential.fields.map((field) => {
        return {
          ...field,
          value: decryptData(field.value),
        };
      }),
    };
  };

  return {
    decryptedData,
    addCredential,
    updateCredential,
    deleteCredential,
    getCredentialById,
  };
}

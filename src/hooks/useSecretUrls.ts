import { decryptData, encryptData } from "@/helpers/cryptojs";
import { useSecretUrlsStore } from "@/store";
import { useEffect, useState } from "react";

export default function useSecretUrls() {
  const { secretUrls, setSecretUrls } = useSecretUrlsStore();
  const [decryptedData, setDecryptedData] = useState<SecretUrl[]>([]);

  useEffect(() => {
    const decrypted = secretUrls.map((url) => {
      return {
        ...url,
        title: decryptData(url.title),
        url: decryptData(url.url),
      };
    });
    setDecryptedData(decrypted);
  }, [secretUrls]);

  const addSecretUrl = (data: Omit<SecretUrl, "id">) => {
    const newSecretUrl: SecretUrl = {
      ...data,
      id: Date.now().toString(),
    };

    const encryptedData: SecretUrl = {
      ...newSecretUrl,
      title: encryptData(newSecretUrl.title),
      url: encryptData(newSecretUrl.url),
    };
    setSecretUrls([encryptedData, ...secretUrls]);
    return newSecretUrl.id;
  };

  const updateSecretUrl = (id: string, data: Omit<SecretUrl, "id">) => {
    const encryptedData: SecretUrl = {
      ...data,
      id,
      title: encryptData(data.title),
      url: encryptData(data.url),
    };
    const updated = secretUrls.map((url) =>
      url.id === id ? encryptedData : url
    );
    setSecretUrls(updated);
  };

  const deleteSecretUrl = (id: string) => {
    const filtered = secretUrls.filter((url) => url.id !== id);
    setSecretUrls(filtered);
  };

  const getSecretUrlById = (id: string): SecretUrl | undefined => {
    const secretUrl = secretUrls.find((url) => url.id === id);
    if (!secretUrl) return undefined;

    return {
      ...secretUrl,
      title: decryptData(secretUrl.title),
      url: decryptData(secretUrl.url),
    };
  };

  return {
    decryptedData,
    addSecretUrl,
    updateSecretUrl,
    deleteSecretUrl,
    getSecretUrlById,
  };
}


// services/cloudinary.ts
import axios from "axios";
import api from "./_axios"; // Pakai instance axios kita yang tadi

interface SignatureResponse {
  success: boolean;
  data: {
    timestamp: number;
    signature: string;
    apiKey: string;
    cloudName: string;
    folder: string;
  };
}

export const uploadToCloudinary = async (
  file: File, // Di Web kita terima objek File asli
  folder: "avatars" | "activities" | "attendance" | "reports",
) => {
  try {
    // 1. Ambil Signature dari Backend Elit kita
    const response = await api.get<SignatureResponse>(
      `/cloudinary/signature?folder=${folder}`,
    );
    const sig = response.data.data;

    // 2. Siapin FormData (Versi Web)
    const formData = new FormData();

    // Di Web, langsung append objek File-nya, bgsd! Gak perlu object ghoib.
    formData.append("file", file);
    formData.append("api_key", sig.apiKey);
    formData.append("timestamp", sig.timestamp.toString());
    formData.append("signature", sig.signature);
    formData.append("folder", sig.folder);

    // 3. Tembak Langsung ke Cloudinary
    const cloudUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;

    const resCloud = await axios.post(cloudUrl, formData, {
      // Di Web, browser bakal otomatis pasang boundary kalo headers-nya dikosongin/otomatis
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      url: resCloud.data.secure_url as string,
      publicId: resCloud.data.public_id as string,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

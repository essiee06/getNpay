import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";

export const isAdmin = async (user) => {
  if (!user) {
    return false;
  }

  const docRef = doc(db, "admins", user.uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};

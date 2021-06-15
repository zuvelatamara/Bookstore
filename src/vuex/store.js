//Ovde su cuvaju sva stanja
import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/router.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userProfile: {},
    authorized: false,
    romanceCollection: [],
    classicsCollection: [],
    scifiCollection: [],
    horrorCollection: [],
    peopleCollection:[]
  },
  actions: {
    async login({ dispatch }, form) {
      //Prijava korisnika
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      //vracanje korisnika i setovanje u state-u
      dispatch("fetchUserProfile", user);

      router.push("/products");
    },

    async logout({ commit }) {
      //Odjava korisnika sa firebase-a
      await fb.auth.signOut();

      //Reset user profile
      commit("setUserProfile", {});

      router.push("/login");
    },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile iz firebase-a
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());
    },

    async register({ dispatch }, form) {
      //Registrovanje korisnika
      //Await vraca neki promise - dok se ne resolvira taj promise, cekaj...
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      //Unesi korisnika u user kolekciju na firebase-u
      await fb.usersCollection.doc(user.uid).set({
        email: form.email,
        password: form.password,
        name: form.name,
        lastName: form.lastName
      });

      //vracanje korisnika i setovanje u state-u
      dispatch("fetchUserProfile", user);

      router.push("/login");
    },


    //Romance collection
    async getRomanceCollection({ state }) {
      var romanceProductsRef = fb.romanceCollection;
      try {
        var allRomanceProductsSnapShot = await romanceProductsRef.get(); //vraca sve dokumente iz kolekcije
        state.romanceCollection = [];
        allRomanceProductsSnapShot.forEach(doc => {
          const singleRomanceProduct = doc.data();
          singleRomanceProduct["id"] = doc.id;
          state.romanceCollection.push(singleRomanceProduct);
          console.log(singleRomanceProduct);
        });
        console.log("Ended with fetching romance products");
      } catch (err) {
        console.log("Error getting documents", err);
      }
    },

    async deleteRomanceProduct({ state }, id) {
      try {
        await fb.romanceCollection.doc(id).delete();
        alert("Product with ID: " + id + " was deleted!");
      } catch (error) {
        console.log(error);
      }
    },
    async createRomanceProduct({ commit, state }, payload) {
      const romanceProduct = {
        title: payload.title,
        writer: payload.writer,
        desc: payload.desc,
        price: payload.price,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.romanceCollection.add(romanceProduct);
      key = data.id;
      console.log("key --> " + key);
      const fileName = payload.src.name;
      console.log(fileName);
      const ext = fileName.slice(fileName.lastIndexOf("."));
      console.log(ext);
      console.log(storageRef);
      const fileData = await storageRef
        .child("romanceProductsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      console.log(imageUrl);
      await fb.romanceCollection.doc(key).get();
      await fb.romanceCollection.doc(key).update({
        src: imageUrl
      });
    },
    async updateRomanceProduct({}, itemForUpdate) {
      console.log(itemForUpdate.id);
      try {
        await fb.romanceCollection.doc(itemForUpdate.id).update({
          title: itemForUpdate.title,
          desc: itemForUpdate.desc,
          src: itemForUpdate.src,
          price: itemForUpdate.price,
          writer: itemForUpdate.writer
        });
        setTimeout(() => {
          alert(
            "Product: " + itemForUpdate.title + " was successfully updated!"
          );
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },

       //Horror collection
       async getHorrorCollection({ state }) {
        var horrorProductsRef = fb.horrorCollection;
        try {
          var allHorrorProductsSnapShot = await horrorProductsRef.get(); //vraca sve dokumente iz kolekcije
          state.horrorCollection = [];
          allHorrorProductsSnapShot.forEach(doc => {
            const singleHorrorProduct = doc.data();
            singleHorrorProduct["id"] = doc.id;
            state.horrorCollection.push(singleHorrorProduct);
            console.log(singleHorrorProduct);
          });
          console.log("Ended with fetching horror products");
        } catch (err) {
          console.log("Error getting documents", err);
        }
      },

      async deleteHorrorProduct({ state }, id) {
        try {
          await fb.horrorCollection.doc(id).delete();
          alert("Product with ID: " + id + " was deleted!");
        } catch (error) {
          console.log(error);
        }
      },
      async createHorrorProduct({ commit, state }, payload) {
        const horrorProduct = {
          title: payload.title,
          writer: payload.writer,
          desc: payload.desc,
          price: payload.price,
          userId: fb.auth.currentUser.uid,
          userName: state.userProfile.email,
          createdOn: new Date()
        };
        let imageUrl;
        let key;
        let storageRef = fb.storage;
        const data = await fb.horrorCollection.add(horrorProduct);
        key = data.id;
        console.log("key --> " + key);
        const fileName = payload.src.name;
        console.log(fileName);
        const ext = fileName.slice(fileName.lastIndexOf("."));
        console.log(ext);
        console.log(storageRef);
        const fileData = await storageRef
          .child("horrorProductsImages/" + key + "." + ext)
          .put(payload.src);
        imageUrl = await fileData.ref.getDownloadURL();
        console.log(imageUrl);
        await fb.horrorCollection.doc(key).get();
        await fb.horrorCollection.doc(key).update({
          src: imageUrl
        });
      },
      async updateHorrorProduct({}, itemForUpdate) {
        console.log(itemForUpdate.id);
        try {
          await fb.horrorCollection.doc(itemForUpdate.id).update({
            title: itemForUpdate.title,
            desc: itemForUpdate.desc,
            src: itemForUpdate.src,
            price: itemForUpdate.price,
            writer: itemForUpdate.writer
          });
          setTimeout(() => {
            alert(
              "Product: " + itemForUpdate.title + " was successfully updated!"
            );
          }, 100);
        } catch (error) {
          console.log(error);
        }
      },

    //Classics collection
    async getClassicsCollection({ state }) {
      var classicsProductsRef = fb.classicsCollection;
      try {
        var allClassicsProductsSnapShot = await classicsProductsRef.get(); //vraca sve dokumente iz kolekcije
        state.classicsCollection = [];
        allClassicsProductsSnapShot.forEach(doc => {
          const singleClassicsProduct = doc.data();
          singleClassicsProduct["id"] = doc.id;
          state.classicsCollection.push(singleClassicsProduct);
          console.log(singleClassicsProduct);
        });
        console.log("Ended with fetching classics products");
      } catch (err) {
        console.log("Error getting documents", err);
      }
    },

    async deleteClassicsProduct({ state }, id) {
      try {
        await fb.classicsCollection.doc(id).delete();
        alert("Product with ID: " + id + " was deleted!");
      } catch (error) {
        console.log(error);
      }
    },
    async createClassicsProduct({ commit, state }, payload) {
      const classicsProduct = {
        title: payload.title,
        writer: payload.writer,
        desc: payload.desc,
        price: payload.price,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.classicsCollection.add(classicsProduct);
      key = data.id;
      console.log("key --> " + key);
      const fileName = payload.src.name;
      console.log(fileName);
      const ext = fileName.slice(fileName.lastIndexOf("."));
      console.log(ext);
      console.log(storageRef);
      const fileData = await storageRef
        .child("classicsProductsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      console.log(imageUrl);
      await fb.classicsCollection.doc(key).get();
      await fb.classicsCollection.doc(key).update({
        src: imageUrl
      });
    },
    async updateClassicsProduct({}, itemForUpdate) {
      console.log(itemForUpdate.id);
      try {
        await fb.classicsCollection.doc(itemForUpdate.id).update({
          title: itemForUpdate.title,
          desc: itemForUpdate.desc,
          src: itemForUpdate.src,
          price: itemForUpdate.price,
          writer: itemForUpdate.writer
        });
        setTimeout(() => {
          alert(
            "Product: " + itemForUpdate.title + " was successfully updated!"
          );
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },

    //SciFi collection
    async getSciFiCollection({ state }) {
      var scifiProductsRef = fb.scifiCollection;
      try {
        var allSciFiProductsSnapShot = await scifiProductsRef.get(); //vraca sve dokumente iz kolekcije
        state.scifiCollection = [];
        allSciFiProductsSnapShot.forEach(doc => {
          const singleSciFiProduct = doc.data();
          singleSciFiProduct["id"] = doc.id;
          state.scifiCollection.push(singleSciFiProduct);
          console.log(singleSciFiProduct);
        });
        console.log("Ended with fetching scifi products");
      } catch (err) {
        console.log("Error getting documents", err);
      }
    },

    async deleteSciFiProduct({ state }, id) {
      try {
        await fb.scifiCollection.doc(id).delete();
        alert("Product with ID: " + id + " was deleted!");
      } catch (error) {
        console.log(error);
      }
    },
    async createSciFiProduct({ commit, state }, payload) {
      const scifiProduct = {
        title: payload.title,
        writer: payload.writer,
        desc: payload.desc,
        price: payload.price,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.scifiCollection.add(scifiProduct);
      key = data.id;
      console.log("key --> " + key);
      const fileName = payload.src.name;
      console.log(fileName);
      const ext = fileName.slice(fileName.lastIndexOf("."));
      console.log(ext);
      console.log(storageRef);
      const fileData = await storageRef
        .child("scifiProductsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      console.log(imageUrl);
      await fb.scifiCollection.doc(key).get();
      await fb.scifiCollection.doc(key).update({
        src: imageUrl
      });
    },
    async updateSciFiProduct({}, itemForUpdate) {
      console.log(itemForUpdate.id);
      try {
        await fb.scifiCollection.doc(itemForUpdate.id).update({
          title: itemForUpdate.title,
          desc: itemForUpdate.desc,
          src: itemForUpdate.src,
          price: itemForUpdate.price,
          writer: itemForUpdate.writer
        });
        setTimeout(() => {
          alert(
            "Product: " + itemForUpdate.title + " was successfully updated!"
          );
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },




    //People collection
    async getPeopleCollection({ state }) {
      var peopleRef = fb.peopleCollection;
      try {
        var allPeopleSnapShot = await peopleRef.get(); //vraca sve dokumente iz kolekcije
        state.peopleCollection = [];
        allPeopleSnapShot.forEach(doc => {
          const singlePeople = doc.data();
          singlePeople["id"] = doc.id;
          state.peopleCollection.push(singlePeople);
          console.log(singlePeople);
        });
        console.log("Ended with fetching people");
      } catch (err) {
        console.log("Error getting documents", err);
      }
    },

    async deletePeople({ state }, id) {
      try {
        await fb.peopleCollection.doc(id).delete();
        alert("Reader with ID: " + id + " was deleted!");
      } catch (error) {
        console.log(error);
      }
    },
    async createPeople({ commit, state }, payload) {
      const people = {
        name: payload.name,
        surname: payload.surname,
        desc: payload.desc,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.peopleCollection.add(people);
      key = data.id;
      console.log("key --> " + key);
      const fileName = payload.src.name;
      console.log(fileName);
      const ext = fileName.slice(fileName.lastIndexOf("."));
      console.log(ext);
      console.log(storageRef);
      const fileData = await storageRef
        .child("peopleImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      console.log(imageUrl);
      await fb.peopleCollection.doc(key).get();
      await fb.peopleCollection.doc(key).update({
        src: imageUrl
      });
    },
    async updatePeople({}, itemForUpdate) {
      console.log(itemForUpdate.id);
      try {
        await fb.peopleCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          desc: itemForUpdate.desc,
          src: itemForUpdate.src,
          surname: itemForUpdate.surname,
        });
        setTimeout(() => {
          alert(
            "Reader: " + itemForUpdate.name + " was successfully updated!"
          );
        }, 100);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    //ovo mi treba kako bi mi vratio profil korisnika nakon prijave
    //inicijalno je userProfile prazan objekat
    //pa se zbog toga koriste mutacije kako bi se postavilo novo stanje userProfile
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  }
});

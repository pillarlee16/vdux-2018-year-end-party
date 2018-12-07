<template>
  <div id="admin">
    <button v-on:click="onCreateClick">CREATE</button>
    <button v-on:click="onGetAllClick">GET_ALL</button>
    <table>
      <thead>
        <td>ID</td>
        <td>Name</td>
        <td>Image URL</td>
        <td>Image File</td>
        <td>Enabled</td>
        <td>Like</td>
        <td>Vote</td>
        <td>Action</td>
      </thead>
      <tbody>
        <tr v-for="(obj, index) in candidates" :key="index">
          <td>{{ obj._id }}</td>
          <td><input type="text" :value="obj.name" placeholder="name1" /></td>
          <td>{{ obj.imageUrl }}</td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" :value="obj.enabled"/></td>
          <td>{{ obj.like }}</td>
          <td>{{ obj.vote }}</td>
          <td>
            <button>APPLY</button>
            <button v-on:click="onDeleteClick(obj._id)">DELETE</button>
          </td>
        </tr>
        <!-- <tr>
          <td>1</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr>
        <tr>
          <td>4</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr>
        <tr>
          <td>5</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr>
        <tr>
          <td>6</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr>
        <tr>
          <td>7</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr>
        <tr>
          <td>8</td>
          <td><input type="text" value="" placeholder="name1" /></td>
          <td><input type="file" value="" placeholder="image1" /></td>
          <td><input type="checkbox" /></td>
          <td>0</td>
          <td>0</td>
          <td><button>APPLY</button></td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
import API from '../services/API.js';

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('admin', [
      'candidates',
    ]),
  },
  created() {
    // API.requestGetAllCandidate();
  },
  methods: {
    onCreateClick() {
      // API.requestCreateCandidate();
      // API.get('candidate/create').then(data => console.log(data));
    },
    onGetAllClick() {
      // API.get('candidate').then(data => console.log(data));
    },
    onDeleteClick(_id) {
      console.log('delete', _id);
      // API.requestDeleteCandidate(_id);
    },
  },
}
</script>
<style>
#admin {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding: 100px;
  background: white;
}

#admin table {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
}

#admin table td {
  padding: 8px;
}
</style>
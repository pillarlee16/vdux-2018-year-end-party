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
        <tr v-for="(obj, index) in candidates" :data-id="obj._id" :key="index">
          <td>{{ obj._id }}</td>
          <td><input class="cname" type="text" :value="obj.name" placeholder="name1" /></td>
          <td>{{ obj.imageUrl }}</td>
          <td><input class="cfile" type="file" value="" placeholder="image1" /></td>
          <td><input class="cenabled" type="checkbox" :checked="obj.enabled"/></td>
          <td>{{ obj.like }}</td>
          <td>{{ obj.vote }}</td>
          <td>
            <button v-on:click="onApplyClick(obj._id)">APPLY</button>
            <button v-on:click="onDeleteClick(obj._id)">DELETE</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import API from '../services/API/index.js';

import { mapState } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapState('candidate', [
      'candidates',
    ]),
  },
  created() {
    API.candidate.requestGetAll();
  },
  methods: {
    onCreateClick() {
      API.candidate.requestCreate();
      // API.requestCreateCandidate();
      // API.get('candidate/create').then(data => console.log(data));
    },
    onGetAllClick() {
      // API.get('candidate').then(data => console.log(data));
    },
    onApplyClick(_id) {
      const $row = this.$el.querySelector(`tr[data-id="${_id}"]`);


      const $cname = $row.querySelector('.cname');
      const $cfile = $row.querySelector('.cfile');
      const $cenabled = $row.querySelector('.cenabled');

      (async function () {
        const payload = {
          name: $cname.value,
          enabled: $cenabled.checked,
        };
  
        if ($cfile.value) {
          const data = await API.candidate.requestUpload($cfile);
          console.log('!!!!', data);
          payload.imageUrl = data.url;
        }

        console.log('payload', payload);

        const result = await API.candidate.requestUpdate(_id, payload);

        console.log('result', result);
      })();

      // const $file = $row.querySelector('input[type="file"]');
      // console.log($file.value);

      // API.candidate.requestUpload($file)
      //   .then(function (data) {
      //     console.log('UPLOAD SUCCESS', data);
      //     $file.value = null;
      //   })
      //   .catch(function () {
      //     console.log('UPLOAD FAIL');
      //   });
      // console.log($row, $file, $file.value, $file.files, typeof $file.value);
    },
    onDeleteClick(_id) {
      console.log('delete', _id);
      API.candidate.requestDelete(_id);
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
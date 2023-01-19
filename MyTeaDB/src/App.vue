<script>
import chunk from "chunk"

export default {
  components: {

  },
  data() {
    return {
      teas: [],
      // hearted: false
    }
  },
  methods: {
    getTeas: function () {
      fetch("http://18.208.21.244:3000/teas")
        .then((response) => response.json())
        .then((data) => {
          this.teas = data;
          console.log(data);
        })
        .catch(console.error);

    },
    chunkify: function (arr, n) {
      return chunk(arr, n);
    },
    openEditModal: function (id, name, temp, steepTime, caffeine) {
      document.getElementById("teaID").value = id;
      document.getElementById("editName").value = name;
      document.getElementById("editTemp").value = temp;
      document.getElementById("editSteep").value = steepTime;
      document.getElementById("editCaffeine").value = caffeine;

    },
    deleteTea: function (id) {
      fetch("http://18.208.21.244:3000/teas/" + id, {
        method: "DELETE"
      })
        .then((response) => {
          this.getTeas();
        })
        .catch(console.error);
    },
    editTea: function () {
      let id = parseInt(document.getElementById("teaID").value);
      let nameOfTea = document.getElementById("editName").value;
      let temp = document.getElementById("editTemp").value;
      let steepTime = document.getElementById("editSteep").value;
      let caffeine = document.getElementById("editCaffeine").value;
      let likes = parseInt(document.getElementById("likes" + id).textContent);

      if (typeof(likes) != 'number') likes = 0;

      if (nameOfTea == "" || temp == "" || steepTime == "" || caffeine == "") {
        document.getElementById("editAlert").style.display = "";
        return;
      }

      const teaBody = {
        name: nameOfTea,
        caffeineamount: parseInt(caffeine),
        likes: likes,
        hexcolour: "#964B00",
        steeptime: parseInt(steepTime),
        temp: parseInt(temp)
      }
      console.log(teaBody)
      fetch("http://18.208.21.244:3000/teas/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teaBody),
      })
        .then((response) => {
          this.getTeas();
          document.getElementById("closeButtonEditModal").click();
        })
        .catch(console.error);
    },
    postTea: function () {

      let nameOfTea = document.getElementById("addName").value;
      let temp = document.getElementById("addTemp").value;
      let steepTime = document.getElementById("addSteep").value;
      let caffeine = document.getElementById("addCaffeine").value;

      if (nameOfTea == "" || temp == "" || steepTime == "" || caffeine == "") {
        document.getElementById("addAlert").style.display = "";
        return;
      }

      const teaBody = {
        name: nameOfTea,
        caffeineamount: parseInt(caffeine),
        likes: 0,
        hexcolour: "#964B00",
        steeptime: parseInt(steepTime),
        temp: parseInt(temp)
      }
      console.log(teaBody)
      fetch("http://18.208.21.244:3000/teas/add", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teaBody),
      })
        .then((response) => {
          this.getTeas();
          document.getElementById("closeButtonAddModal").click();
        })
        .catch(console.error);

    },
    heartIt: function (id, likes) {
      //POST likes
      fetch("http://18.208.21.244:3000/teas/heart/" + id + "/" + likes, {
        method: "PUT",
        body: JSON.stringify({}),
      })
        .then((response) => {
          this.getTeas();
        })
      document.getElementById("heart" + id).style.display = "none";
      document.getElementById("heartCheck" + id).style.display = "";
    }
  },
  mounted() {
    this.getTeas();
    const addModal = document.getElementById('addTeaModal')
    addModal.addEventListener('hidden.bs.modal', event => {
      document.getElementById("addName").value = "";
      document.getElementById("addTemp").value = "";
      document.getElementById("addSteep").value = "";
      document.getElementById("addCaffeine").value = "";
    })

    addModal.addEventListener('show.bs.modal', event => {
      document.getElementById('addAlert').style.display = "none";
    })

    const editModal = document.getElementById('editTeaModal');
    editModal.addEventListener('show.bs.modal', event => {
      document.getElementById('editAlert').style.display = "none";
    })
    editModal.addEventListener('hidden.bs.modal', event => {
      document.getElementById("editName").value = "";
      document.getElementById("editTemp").value = "";
      document.getElementById("editSteep").value = "";
      document.getElementById("editCaffeine").value = "";
    })
  }

}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyTeaDB
        <font-awesome-icon icon="fa-solid fa-database" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">About the Project</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <br>
  <br>
  <div class="alert alert-primary alert-dismissible fade show" role="alert" style="margin-left:10%; margin-right:10%">
    This web app is meant to demonstrate Create, Read, Update, Delete (CRUD) functionality to a <strong>PostgreSQL</strong>
    database.
    The REST API is built with <strong>Node.js</strong> and <strong>Express.js</strong> and hosted on <strong>AWS EC2</strong>.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <br>

  <div style="text-align: center;">
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addTeaModal">Add a new
      tea &nbsp;
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
  </div>


  <!-- add Modal -->
  <div class="modal fade" id="addTeaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Enter Tea Details &nbsp;
            <font-awesome-icon icon="fa-solid fa-mug-hot" />
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            id="closeButtonAddModal"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning" role="alert" style="display:none" id="addAlert">
            Please enter details for all fields.
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="addName" placeholder="">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" max="150" class="form-control" id="addTemp" placeholder="">
            <label for="floatingPassword">Optimal Temperature (ºC)</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" max="150" class="form-control" id="addSteep" placeholder="">
            <label for="floatingPassword">Steep Time (Mins)</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" class="form-control" id="addCaffeine" placeholder="">
            <label for="floatingPassword">Caffeine Amount (mg)</label>
          </div>
          <!-- <label for="exampleColorInput" class="form-label">Color picker</label>
          <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color"> -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success" @click="this.postTea()">Add</button>
        </div>
      </div>
    </div>
  </div>
  <br>

  <div>
    <p class="text-muted" style="margin:3%" v-show="this.teas.length != 0">Teas in the Database</p>
    <p style="text-align: center;" v-show="this.teas.length == 0">Nothing in the Database. Add a tea!</p>
    <div class="d-flex align-content-between flex-wrap">
      <div v-for="tea in this.teas" :key="tea.id" style="margin:2%;">
        <!-- <div class="shadow-sm p-3 mb-5 bg-white rounded"> -->
        <div class="card" style="width: 18rem; margin-left: 0.25%;margin-right: 0.25%;">
          <div class="card-body">
            <h5 class="card-title">{{ tea.name }}</h5>
            <div class="d-flex align-content-between flex-wrap">
            <p class="text-muted">
              <font-awesome-icon icon="fa-solid fa-temperature-three-quarters" />&#8239;{{tea.temp}}&nbsp;°C &nbsp;
            </p>
            <p class="text-muted">
              <font-awesome-icon icon="fa-solid fa-stopwatch" />&#8239;{{tea.steeptime}}&nbsp;mins &nbsp;
            </p>
            <p class="text-muted">
              <font-awesome-icon icon="fa-solid fa-bolt" /> &#8239;{{tea.caffeineamount}}&nbsp;mg &nbsp;
            </p>
          </div>
            <hr>
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <div class="d-flex justify-content-start">
    
                    <div :id="'heartCheck' + tea.id" style="display:none">
                      <font-awesome-icon icon="fa-solid fa-heart-circle-check" />

                    </div>
                    <div @click="this.heartIt(tea.id, tea.likes)" :id="'heart' + tea.id">
                      <font-awesome-icon icon="fa-solid fa-heart" />

                    </div>
                    &nbsp;
                  <p :id="'likes' + tea.id" class="text-muted">{{ tea.likes }}</p>
                  </div>
                  
                </div>
                <div class="col-sm">
                  <div class="d-flex justify-content-end">
                    <a class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editTeaModal"
                      @click="this.openEditModal(tea.id, tea.name, tea.temp, tea.steeptime, tea.caffeineamount)">Edit</a>
                    &nbsp;
                    <a class="btn btn-danger btn-sm" @click="this.deleteTea(tea.id)">
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </a>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>

  <!-- edit Modal -->
  <div class="modal fade" id="editTeaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Tea Details? &nbsp;
            <font-awesome-icon icon="fa-solid fa-mug-hot" />
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeButtonEditModal"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning" role="alert" style="display:none" id="editAlert">
            Please enter details for all fields.
          </div>
          <div class="row">
            <div class="col-8">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="editName" placeholder="">
                <label for="editName">Name</label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="teaID" value="" disabled>
                <label for="teaID">Tea ID</label>
              </div>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" max="150" class="form-control" id="editTemp" placeholder="">
            <label for="editTemp">Optimal Temperature (ºC)</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" max="150" class="form-control" id="editSteep" placeholder="">
            <label for="editSteep">Steep Time (Mins)</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" class="form-control" id="editCaffeine" placeholder="">
            <label for="editCaffeine">Caffeine Amount (mg)</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-warning" @click="this.editTea()">Save Changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.fa-heart:hover {
  color: red;
}

.fa-heart-circle-check {
  color: green;
}
</style>

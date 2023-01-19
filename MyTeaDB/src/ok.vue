<script>
import chunk from "chunk"


export default {
    components: {

    },
    data() {
        return {
            users: [],
            currId: -1,
            isRegistered: false,
            hasAnswered: false
        }
    },

    methods: {
        getUsers: function () {
            fetch("http://thewatercooler.tech:9000/users")
                .then((response) => response.json())
                .then((data) => {
                    this.users = data;
                    console.log(data);

                })
                .catch(console.error);

        },
        submitFunction: function () {
            if (document.getElementById("question1").value == "" ||
                document.getElementById("question2").value == "" ||
                document.getElementById("question3").value == "" ||
                document.getElementById("question4").value == "" ||
                document.getElementById("question5").value == "") {
                alert("Please answer all the questions");
            } else {
                const questions = {
                    r1: document.getElementById("question1").value,
                    r2: document.getElementById("question2").value,
                    r3: document.getElementById("question3").value,
                    r4: document.getElementById("question4").value,
                    r5: document.getElementById("question5").value,

                }
                console.log(questions)
                fetch("http://thewatercooler.tech:9000/users/set" + this.currId, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(questions),
                })
                    .then((response) => { 
                        this.hasAnswered = true;
                    })
                    .catch(console.error);
            }
            document.getElementById("question1").value = "";
            document.getElementById("question2").value = "";
            document.getElementById("question3").value = "";
            document.getElementById("question4").value = "";
            document.getElementById("question5").value = "";
        }
    }

</script>

<template>
    <div v-if="!this.isRegistered">
        <div class="container my-5">
            <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="p-3 p-lg-5 pt-lg-3">
                            <h1 id="heroHeader" class="display-4 fw-bold lh-1">Take a break at the watercooler</h1>
                            <p id="heroMessage" class="lead">Prior to the rise of remote and hybrid workforces,
                                employees would take a break at the company water cooler and have the most amazing
                                conversations with one another. The Watercooler aims to revive employee camaraderie in
                                the digital age.</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                                <button id="getStarted" type="Sign Up" id="getStartedButton"
                                    onclick="scroll_to_sign_up()"
                                    class="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <img id="heroImage" src="assets/heroImage.png" class="img-fluid" width="110%">
                    </div>
                </div>
            </div>
        </div>

        <figure class="text-center">
            <blockquote class="blockquote">
                <p></p>
                <h1 id="signUpHeader">Sign Up</h1>
                <p class="lead" id="signUpSubHeader">
                    Fill in the information below
                </p>
            </blockquote>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <div class="container-fluid">
                            <div class="form-floating mb-3">
                                <input type="fullName" class="form-control" id="floatingName"
                                    placeholder="John Appleseed">
                                <label id="floatingNameThing" for="floatingInput">Full Name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingEmail"
                                    placeholder="name@example.com">
                                <label id="floatingEmailThing" for="floatingInput">Email</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password">
                                <label id="floatingPasswordThing" for="floatingPassword">Password</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="confirmPassword" class="form-control" id="floatingPasswordConfirm"
                                    placeholder="Reenter Password">
                                <label id="floatingPasswordConfirmThing" for="floatingPasswordConfirm">Confirm
                                    Password</label>
                            </div>

                            <div class="col-12">
                                <button class="btn btn-primary" onclick="wrong_pass_alert()" id="signUpButton"
                                    type="submit">Submit</button>
                            </div>
                            <script src="app.js"></script>
                        </div>

                        <div v-if="this.isRegistered">

                            <head>
                                <meta charset="utf-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <title>Ice Breaker Questions</title>
                                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                                    rel="stylesheet"
                                    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                                    crossorigin="anonymous">
                                <link rel="stylesheet" href="styles.css">
                            </head>

                            <figure class="text-center">
                                <blockquote
                                    class="blockquote p-3 border-bottom border-primary border-4 rounded-0 bg-light text-dark">
                                    <p></p>
                                    <h1 class="fw-bold">Ice Breaker Questions</h1>
                                    <p class="lead">
                                        Answer Questions & Find Your Work Buddy
                                    </p>
                                </blockquote>

                                <body>
                                    <div class="container text-center">
                                        <div class="row">
                                            <div class="col">
                                                <div class="container-fluid">

                                                    <div class="shadow p-3 mb-3 bg-body rounded">
                                                        <label for="question1" class="form-label">What’s the last great
                                                            TV show or movie you watched?</label>
                                                        <input type="text" class="form-control" id="question1"
                                                            placeholder="">
                                                    </div>

                                                    <div class="shadow p-3 mb-3 bg-body rounded">
                                                        <label for="question2" class="form-label">If you could learn one
                                                            new professional skill, what would it
                                                            be?</label>
                                                        <input type="text" class="form-control" id="question2"
                                                            placeholder="">
                                                    </div>

                                                    <div class="shadow p-3 mb-3 bg-body rounded">
                                                        <label for="question3" class="form-label">If you were famous,
                                                            what would you be famous for?</label>
                                                        <input type="text" class="form-control" id="question3"
                                                            placeholder="">
                                                    </div>

                                                    <div class="shadow p-3 mb-3 bg-body rounded">
                                                        <label for="question4" class="form-label">If you had to delete
                                                            all but 3 apps from your smartphone, which
                                                            ones would you keep?</label>
                                                        <input type="text" class="form-control" id="question4"
                                                            placeholder="">
                                                    </div>

                                                    <div class="shadow p-3 mb-3 bg-body rounded">
                                                        <label for="question5" class="form-label">You can have an
                                                            unlimited supply of one thing for the rest of
                                                            your life, what is it?</label>
                                                        <input type="text" class="form-control" id="question5"
                                                            placeholder="">
                                                    </div>

                                                    <div class="col-12">
                                                        <button class="btn btn-primary"
                                                            v-click="submitFunction()">Submit</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                               
                                </body>


                        </div>

                        <div class="container text-center">
                            <div class="row g-2">
                                <div class="col-6">
                                    <div class="p-3 border bg-light shadow p-3 mb-5 bg-body rounded">
                                        <h3>Name of match</h3>
                                        <h6>Email: </h5>
                                            <h6>Question responses </h5>
                                                <p class="text-start">What’s the last great TV show or movie you
                                                    watched?</p>
                                                <p class="text-start">Response 1</p>
                                                <p class="text-start">If you could learn one new professional skill,
                                                    what would it
                                                    be?</p>
                                                <p class="text-start">Response 2</p>
                                                <p class="text-start">If you were famous, what would you be famous for?
                                                </p>
                                                <p class="text-start">Response 3</p>
                                                <p class="text-start">If you had to delete all but 3 apps from your
                                                    smartphone, which
                                                    ones would you keep?</p>
                                                <p class="text-start">Response 4</p>
                                                <p class="text-start">You can have an unlimited supply of one thing for
                                                    the rest of
                                                    your life, what is it?</p>
                                                <p class="text-start">Response 5</p>
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



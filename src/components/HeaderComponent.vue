<template>
    <header>
        <div class="header__section-wrapper">
            <p class="header__logo">PNC<span>Drip</span></p>

            <nav>
                <a href="/">Home</a>
                <a href="/shop">Shop</a>
                <a href="#">Orders</a>
                <a href="#">Checkouts</a>
            </nav>

            <div class="header__controllers-wrapper">
                <i class="fa-solid fa-cart-shopping" aria-label="Cart icon"></i>

                <div class="header__profile-wrapper">
                    <span>
                        <i class="fa-solid fa-user-large"></i>
                    </span>
                    <p>Hi, Steven</p>
                    <i class="fa-solid fa-caret-down"></i>
                </div>
            </div>
        </div>
    </header>
</template>


<style scoped>
header {
    width: 100%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);

    position: relative;
}

.header__section-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 1140px;
    margin-inline: auto;
    padding: 15px 20px;
}


/* START OF STYLE FOR LOGO */
.header__logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.header__logo {
    font-size: 1.2rem;
    font-weight: 600;
}

.header__logo span {
    color: var(--primary-color);
}

/* END OF STYLE FOR LOGO */



/* START OF STYLE FOR NAVIGATION MENU */
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
}

nav .fa-xmark {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

nav a {
    text-decoration: none;
    color: black;
    font-size: 1rem;
    font-weight: 450;
}

/* END OF STYLE FOR NAVIGATION MENU */




/* START OF STYLE FOR PROFILE CONTROLLER & CART */
.header__controllers-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.header__controllers-wrapper .fa-cart-shopping {
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.header__controllers-wrapper .fa-cart-shopping:hover {
    color: var(--primary-color);
}

.header__profile-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;
}

.header__profile-wrapper span {
    background: rgb(68, 68, 68);
    height: 30px;
    width: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
}

.header__profile-wrapper span i {
    color: white;
}

.header__profile-wrapper p {
    font-size: 1rem;
    font-weight: 400;
}

/* END OF STYLE FOR PROFILE CONTROLLER & CART */
</style>

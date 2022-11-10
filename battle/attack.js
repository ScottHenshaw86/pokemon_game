function enemyFaint() {
    setTimeout(() => {
        console.log("Enemy Dead");
        let info = document.querySelector(".info > h2");
        // TODO: implement fainting
        info.style.display = "none";
        info.style.display = "block";
        info.textContent = "YOU WIN!";
        let enemy = document.querySelector('#enemy');
        enemy.classList.add('defeated');
    }, 600);
}

function attack(attacker, attackingPokemon, atk, enemy) {
    let enemyHpBar = document.querySelector('#enemy .remaining-hp');

    if(enemy.statusDuration > 0) {
        enemy.currentHp -= enemy.statusDmg;
        console.log('sustained dot damage:', enemy.statusDmg, "hp:", enemy.currentHp);
        enemyHpBar.style.width = `${Math.ceil((enemy.currentHp / enemy.maxHp) * 100)}%`;
        if (enemy.currentHp <= 0) {
            enemyFaint();
        }
    }

    let totalDmg = atk.power + attacker.attackPower;
    let special = "";
    let statusEffect = "";
    console.log(":",)
    console.log("atk.power:",atk.power)
    console.log("attackingPokemon.attackPower:",attacker.attackPower);

    console.log("1:",totalDmg);
    totalDmg = totalDmg * (randomNum(8, 12) / 10); 
    console.log("2:",totalDmg);
    
    if (elements[atk.element].strong == enemy.element) {
        totalDmg *= 1.25;
    } else if (elements[atk.element].weak == enemy.element) {
        totalDmg *= .75;
    }
    totalDmg = Math.floor(totalDmg);
    console.log("3:",totalDmg);
    
    let pokemonImg;
    if (attackingPokemon == "player") { // TODO: update this once playerPokemon is implemented
        pokemonImg = document.querySelector("#player");
    } else {
        pokemonImg = document.querySelector("#enemy");
    }

    if (atk.type == "dot") {
        totalDmg = totalDmg / (atk.statusDuration + 1);
        statusEffect = {
            effect: atk.statusEffect,
            duration: atk.statusDuration,
            damage: totalDmg
        };
    }

    pokemonImg.classList.add("attacking");
    setTimeout(() => {
        pokemonImg.classList.remove("attacking");
    }, 1000);

    enemy.currentHp -= totalDmg;
    enemyHpBar.style.width = `${Math.ceil((enemy.currentHp / enemy.maxHp) * 100)}%`;
    console.log("totalDmg:",totalDmg)
    console.log("enemy.currentHp:",enemy.currentHp);
    console.log("enemy.maxHp:",enemy.maxHp);

    if (enemy.currentHp <= 0) {
        enemyFaint();
    }

    return {
        dmg: totalDmg,
        status: statusEffect,
        special: special
    };
}
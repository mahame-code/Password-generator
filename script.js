const generateButton = document.querySelector(".Generate");

const result = document.querySelector(".password");

// const pswGroups = document.querySelector("container-button");

let passwordGroupCount = 2;

// pswGroups.addEventListener("click", (e) => {
//   const target = e.target;

//   if (!target.classList.contains("boutton")) {
//     return;
//   } else {
//     const value = Number(target.innerText);
//     console.log({ value });
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  // Sélectionner les boutons avec la classe 'boutton'
  const buttonsContainer = document.querySelector(".container-button");

  // Vérifiez que l'élément existe avant d'ajouter l'événement
  if (buttonsContainer) {
    buttonsContainer.addEventListener("click", (e) => {
      const target = e.target;

      // Vérifiez si l'élément cliqué a la classe 'boutton'
      if (!target.classList.contains("boutton")) {
        return;
      } else {
        // Si c'est un bouton, récupérez la valeur et affichez-la
        const value = Number(target.innerText);
        // console.log({ value }); // Affiche la valeur dans la console
        Array.from(buttonsContainer.children).forEach((element) => {
          element.classList.remove("active");
        });
        target.classList.add("active");
        passwordGroupCount = value;
        generatePassword();
        // console.log(passwordGroupCount);
      }
    });
  } else {
    console.error("L'élément .container-button est introuvable dans le DOM.");
  }
});

const voyelles = ["a", "e", "i", "o", "u"];
const consonnes = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function nombreAleatoire(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomItem(arr) {
  const index = nombreAleatoire(0, arr.length - 1);
  return arr[nombreAleatoire(0, arr.length - 1)];
}

function generatePassword() {
  console.log("Generate password with", passwordGroupCount);
  let final = "";
  const TEMPLATE = ["C", "V", "C", "C", "V", "C"];
  const randomGroupWithUppercaseIndex = nombreAleatoire(
    0,
    passwordGroupCount - 1
  );
  const randomGroupNumberIndex = nombreAleatoire(0, passwordGroupCount - 1);

  for (let i = 0; i < passwordGroupCount; i++) {
    let groups = [];
    for (const key of TEMPLATE) {
      const randomElement = getRandomItem(key === "C" ? consonnes : voyelles);
      groups.push(randomElement);
    }
    if (randomGroupNumberIndex === i) {
      groups[5] = nombreAleatoire(0, 9);
    }
    if (randomGroupWithUppercaseIndex === i) {
      groups[0] = groups[0].toUpperCase();
    }
    final += groups.join("");
    if (i !== passwordGroupCount - 1) {
      final += "-";
    }
  }
  if (final) {
    console.log(final);
    result.innerText = final;
  }
}
generatePassword();

generateButton.addEventListener("click", () => generatePassword());

document.addEventListener("DOMContentLoaded", () => {
  const magicButton = document.querySelector(".container-password");
  magicButton.addEventListener("click", () => {
    // @ts-ignore
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
    if (result) {
      const text = result.textContent || result.innerText;
      navigator.clipboard.writeText(text).then(
        () => {
          console.log("Texte copié : ", text);
          // alert("Texte copié dans le presse-papier !");
        },
        (err) => {
          console.error("Échec de la copie : ", err);
        }
      );
    }
  });
});

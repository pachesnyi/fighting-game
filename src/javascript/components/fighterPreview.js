import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  if(fighter) {
    const { name, health, attack, defense } = fighter;
    let fighterPreviewWrapper = createElement({
      tagName: 'div',
      className: 'fighter-preview___wrapper'
    });
    let fighterName = createElement({
      tagName: 'div',
      className: 'fighter-preview___row'
    });
    let fighterHealth = createElement({
      tagName: 'div',
      className: 'fighter-preview___row'
    });
    let fighterAttack = createElement({
      tagName: 'div',
      className: 'fighter-preview___row'
    });
    let fighterDefence = createElement({
      tagName: 'div',
      className: 'fighter-preview___row'
    });
    fighterName.innerHTML = `<h2 class="fighter-preview___title">${name}</h2>`;
    fighterHealth.innerHTML = `<span>Health: <span>${health}</span></span>`;
    fighterAttack.innerHTML = `<span>Attack: <span>${attack}</span></span>`;
    fighterDefence.innerHTML = `<span>Defence: <span>${defense}</span></span>`;
    fighterPreviewWrapper.append(fighterName, fighterHealth, fighterAttack, fighterDefence);
    fighterElement.append(fighterPreviewWrapper);
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

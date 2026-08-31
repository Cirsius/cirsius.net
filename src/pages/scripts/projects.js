document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('projects-list');
  if (!list) return;

  try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error();

    const repos = await res.json();
    list.textContent = '';

    for (const repo of repos) {
      const item = document.createElement('li');
      const project = document.createElement('div');
      const link = document.createElement('a');
      const name = document.createElement('span');
      const desc = document.createElement('span');

      project.className = 'project';
      name.className = 'project-name';
      desc.className = 'project-desc';

      link.href = repo.url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      name.textContent = repo.name;
      desc.textContent = repo.description || '';

      link.appendChild(name);
      project.append(link, desc);
      item.appendChild(project);
      list.appendChild(item);
    }
  } catch {
    list.textContent = '';
    const item = document.createElement('li');
    item.textContent = 'could not load repos';
    list.appendChild(item);
  }
});

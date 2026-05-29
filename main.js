document.querySelectorAll('.btn-ver').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var id = btn.getAttribute('data-alvo');
    var modal = document.getElementById(id);
    if (modal) modal.classList.add('aberto');
  });
});

document.querySelectorAll('.fechar').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var id = btn.getAttribute('data-fechar');
    var modal = document.getElementById(id);
    if (modal) modal.classList.remove('aberto');
  });
});

document.querySelectorAll('.overlay').forEach(function(overlay) {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('aberto');
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay.aberto').forEach(function(o) {
      o.classList.remove('aberto');
    });
  }
});
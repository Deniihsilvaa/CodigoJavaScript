let ur = "Link"
function function (params) {
  
  // Enviando requisição AJAX para ler dados
  $.ajax({
      type: 'POST',
      url: ur,
      data: {
          qualFuncao: 'funcao'
      },
  }).done(function (response) {
      // Limpar e destruir a tabela existente, se houver
      try {
          $('#table').DataTable().clear();
          $('#table').DataTable().destroy();
      } catch (e) {
          console.log(e);
      }

      let data;
      try {
          data = JSON.parse(response);
      } catch (error) {
          console.error("Erro ao parsear os dados: ", error);
          return;
      }

      // Verifique se os dados estão no formato esperado
      if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0])) {
          console.error("Estrutura dos dados inválida: ", data);
          alert("Erro ao ler os dados: formato inválido");
          return;
      }

      // Inicialize a tabela DataTables com os dados
      $('#table-nfe').DataTable({
          data: data,
          scrollCollapse: true,
          scroller: true,
          scrollY: 310,
          deferRender: true,
          columns: [
              {
                  title: "ID",
                  searchable: false
              },
              { title: "Titulo" },
          ]
      });

  }).fail(function (xhr, status, error) {
      // Tratamento de erro
      console.error("Erro ao ler dados: ", error);
      alert("Erro ao ler dados: " + error);
  });
}
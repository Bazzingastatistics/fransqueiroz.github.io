 $(document).ready(function(){
 const navSlide = () =>{
  const burguer = document.querySelector('.burguer');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  
  burguer.addEventListener('click',()=>{
    nav.classList.toggle('nav-active');
  
  
    navLinks.forEach((link, index) =>{
      if(link.style.animation){
        link.style.animation = '';
      }else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 }s`;
      }
    });
    
    burguer.classList.toggle('toggle');
  });
  
  }

  navSlide();

  var select = document.getElementsByClassName('selectVariable');
  select.onchange = function () {
      select.className = this.options[this.selectedIndex].className;
  }

  $("#content div:nth-child(1)").show();
        $(".abas li:first div").addClass("selected");       
        $(".aba").click(function(){
            $(".aba").removeClass("selected");
            $(this).addClass("selected");
            var indice = $(this).parent().index();
            indice++;
            $("#content div").hide();
           $("#content div:nth-child("+indice+")").show();
        });
        
        $(".aba").hover(
            function(){$(this).addClass("ativa")},
            function(){$(this).removeClass("ativa")}
        ); 

        $(".reloadPage").click(function() {
          location.reload();
});
  
});





      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300,
                      'margin': 0 ,
                    'position': 'absolute'};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }



  

// const inputEnter = document.querySelector('.enter');
// inputEnter.addEventListener('keyup', function(e){
//   var key = e.which || e.keyCode;
//   if (key == 13) { 
//     if(inputEnter.value == ""){
//       alert('Campo de Valores Vazio');
//     }else {
//       cont.push((inputEnter.value));
//       console.log(cont);
//       Present.className = 'chipsActive';
//       console.log( inputEnter.value)
//       var p = document.createElement('p');
//       var label = document.createElement('label');
//       var result = document.createTextNode(inputEnter.value);
//       var labelResult = document.createTextNode('x');
//       label.appendChild(labelResult);
//       p.appendChild(label);
//       p.appendChild(result);
      
//       presentText.appendChild(p); 
//       inputEnter.value = "";
//     }
//   }
// });
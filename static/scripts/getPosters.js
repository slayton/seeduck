
	var APIKEY = 'A759044985ADC3E7';
	var BASE_URL ='http://thetvdb.com/api'
	

function getSeriesID(seriesName)
{
	var getSeriesUrl = BASE_URL + '/GetSeries.php?seriesname="' + seriesName + '"';
	console.log(getSeriesUrl);

	getPosterForID(seriesName);
	$.ajax({
    	url: getSeriesUrl,
    	jsonpCallback: "mydata",
    	success: parseXml,
    	dataType: 'xml'
    	c
  	});
};

function parseXml(xml)
{
	console.log($(xml))
  $(xml).find('entry').each(function()
  {
   $("div").append($(this).find('title').text());
  });
}	


function getPosterForID(seriesId)
{
	var getPosterUrl = APIKEY + '/series/' + seriesId + '/banners.xml'
	console.log(getPosterUrl);
}
function getPosterForSeries(seriesName){
	console.log('getting series name:' + seriesName);
	getSeriesID(seriesName);
	

}
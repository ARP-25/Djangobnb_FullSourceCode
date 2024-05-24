from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from property.models import Property, Reservation
from property.serializers import PropertyListSerializer, PropertyDetailSerializer, ReservationsListSerializer

from property.forms import PropertyForm
from django.utils.dateparse import parse_date



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_list(request):
    properties = Property.objects.all()
    serializer = PropertyListSerializer(properties, many=True)
    return JsonResponse(serializer.data, safe=False)



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_detail(request, pk):
    property = Property.objects.get(pk=pk)

    serializer = PropertyDetailSerializer(property, many=False)

    return JsonResponse(serializer.data)



@api_view(['POST', 'FILES'])
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)
    if form.is_valid():
        property= form.save(commit=False)
        property.host = request.user
        property.save()
        return JsonResponse({"message": "Property created successfully", "success": True}, status=201)
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({"errors": form.errors.as_json()}, status=400)
    


@api_view(['POST'])
def book_property(request, pk):
    try:
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        number_of_nights = request.POST.get('number_of_nights')
        total_price = request.POST.get('total_price')
        guests = request.POST.get('guests')

        property = Property.objects.get(pk=pk)
        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guests=guests,
            created_by=request.user
        )
        return JsonResponse({"message": "Booking successful", "success": True}, status=201)

    except Exception as e:
        return JsonResponse({"message": str(e), "success": False}, status=400)
    

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_reservations(request, pk):
    try:
        property = Property.objects.get(pk=pk)
    except Property.DoesNotExist:
        return JsonResponse({'error': 'Property not found'}, status=404)
    
    reservations = property.reservations.all()
    serializer = ReservationsListSerializer(reservations, many=True)
    
    return JsonResponse(serializer.data, safe=False, status=200)
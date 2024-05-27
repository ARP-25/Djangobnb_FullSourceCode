from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from property.models import Property
from property.serializers import PropertyListSerializer, ReservationsListSerializer, PropertyDetailSerializer
from useraccount.models import User
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_list(request):
    print('================================ IN PROPERTY LIST ===========================')
    
    # Check for the Authorization header
    auth_header = request.META.get('HTTP_AUTHORIZATION', None)
    if auth_header is None:
        print('Authorization header is missing')
        return JsonResponse({'error': 'Authorization header is missing'}, status=401)
    
    
    try:
        token_str = auth_header.split('Bearer ')[1]
        print('Token after split ===========================', token_str)
        
        token = AccessToken(token_str)
        print('Token ===========================', token)
        
        user_id = token['user_id']
        print('User ID ===========================', user_id)
        
        user = User.objects.get(pk=user_id)
        print('User ===========================', user)
        
    except Exception as e:
        print('Error processing token:', str(e))
        user = None
    
    favorites = []
    properties = Property.objects.all()
    host_id = request.GET.get('host_id', '')

    # Filter properties by host_id
    if host_id:
        properties = properties.filter(host__id=host_id)
    print('Properties ===========================', properties)

    if user:
        for property in properties:
            if user in property.favorited.all():
                favorites.append(property.id)
    print('Favorites ===========================', favorites)

    serializer = PropertyListSerializer(properties, many=True)
    return JsonResponse({'data': serializer.data, 'favorites': favorites}, status=200)



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


@api_view(['POST'])
def toggle_favorite(request, pk):
    property = get_object_or_404(Property, pk=pk)
    if request.user in property.favorited.all():
        property.favorited.remove(request.user)
        return JsonResponse({'message': 'Property removed from favorites', 'is_favorite': False}, status=200)
    else:
        property.favorited.add(request.user)
        return JsonResponse({'message': 'Property added to favorites', 'is_favorite': True}, status=200)